// schemas/index.js
export const schema = {
  types: [
    // Category Schema
    {
      name: "category",
      title: "श्रेणी (Category)",
      type: "document",
      fields: [
        {
          name: "name",
          title: "श्रेणी का नाम",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("श्रेणी का नाम आवश्यक है"),
        },
        {
          name: "slug",
          title: "URL Slug",
          type: "slug",
          options: {
            source: "name",
            maxLength: 96,
            slugify: (input) => {
              const categoryMap = {
                देश: "desh",
                राजनीति: "rajneeti",
                दुनिया: "duniya",
                विश्लेषण: "vishleshan",
                विचार: "vichar",
                वीडियो: "video",
                "वक़्त-बेवक़्त": "waqt-bewaqt",
              };
              if (categoryMap[input]) return categoryMap[input];
              return input
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w\-]+/g, "")
                .replace(/\-\-+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
            },
          },
          validation: (Rule) => Rule.required().error("Slug आवश्यक है"),
        },
        {
          name: "description",
          title: "विवरण",
          type: "text",
          rows: 3,
        },
      ],
      preview: {
        select: {
          title: "name",
          subtitle: "slug.current",
        },
      },
    },

    // Post Schema
    {
      name: "post",
      title: "समाचार (Post)",
      type: "document",
      fields: [
        {
          name: "title",
          title: "शीर्षक",
          type: "string",
          validation: (Rule) =>
            Rule.required()
              .min(10)
              .max(200)
              .error("शीर्षक 10-200 अक्षरों के बीच होना चाहिए"),
        },
        {
          name: "slug",
          title: "URL Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
            slugify: (input) => {
              return (
                input
                  .toLowerCase()
                  .replace(/[\u0900-\u097F]/g, "")
                  .replace(/[^\w\s-]/g, "")
                  .trim()
                  .replace(/\s+/g, "-")
                  .replace(/\-\-+/g, "-")
                  .replace(/^-+/, "")
                  .replace(/-+$/, "") || `post-${Date.now()}`
              );
            },
          },
          validation: (Rule) => Rule.required().error("URL Slug आवश्यक है"),
        },
        {
          name: "content",
          title: "सामग्री",
          type: "blockContent",
          validation: (Rule) => Rule.required().error("सामग्री आवश्यक है"),
        },
        {
          name: "mainImage",
          title: "मुख्य तस्वीर",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              title: "कैप्शन",
              type: "string",
              description: "तस्वीर के नीचे दिखने वाला कैप्शन",
            },
          ],
        },
        {
          name: "publishedAt",
          title: "प्रकाशन तारीख",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
          validation: (Rule) =>
            Rule.required().error("प्रकाशन तारीख आवश्यक है"),
        },
        {
          name: "category",
          title: "श्रेणी",
          type: "reference",
          to: [{ type: "category" }],
          validation: (Rule) =>
            Rule.required().error("श्रेणी का चुनाव आवश्यक है"),
        },
        {
          name: "state",
          title: "राज्य",
          type: "string",
          options: {
            list: [
              { title: "आंध्र-प्रदेश", value: "andhra-pradesh" },
              { title: "अरुणाचल-प्रदेश", value: "arunachal-pradesh" },
              { title: "असम", value: "assam" },
              { title: "बिहार", value: "bihar" },
              { title: "छत्तीसगढ़", value: "chhattisgarh" },
              { title: "गोवा", value: "goa" },
              { title: "गुजरात", value: "gujarat" },
              { title: "हरियाणा", value: "haryana" },
              { title: "हिमाचल-प्रदेश", value: "himachal-pradesh" },
              { title: "झारखंड", value: "jharkhand" },
              { title: "कर्नाटक", value: "karnataka" },
              { title: "केरल", value: "kerala" },
              { title: "मध्य-प्रदेश", value: "madhya-pradesh" },
              { title: "महाराष्ट्र", value: "maharashtra" },
              { title: "मणिपुर", value: "manipur" },
              { title: "मेघालय", value: "meghalaya" },
              { title: "मिजोरम", value: "mizoram" },
              { title: "नागालैंड", value: "nagaland" },
              { title: "ओडिशा", value: "odisha" },
              { title: "पंजाब", value: "punjab" },
              { title: "राजस्थान", value: "rajasthan" },
              { title: "सिक्किम", value: "sikkim" },
              { title: "तमिलनाडु", value: "tamil-nadu" },
              { title: "तेलंगाना", value: "telangana" },
              { title: "त्रिपुरा", value: "tripura" },
              { title: "उत्तर-प्रदेश", value: "uttar-pradesh" },
              { title: "उत्तराखंड", value: "uttarakhand" },
              { title: "पश्चिम-बंगाल", value: "west-bengal" },
            ],
          },
          description: "अगर खबर किसी राज्य से संबंधित है तो चुनें (वैकल्पिक)",
        },
        {
          name: "views",
          title: "Views Count",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.min(0),
        },
      ],
      orderings: [
        {
          title: "प्रकाशन तारीख के अनुसार (नया पहले)",
          name: "publishedAtDesc",
          by: [{ field: "publishedAt", direction: "desc" }],
        },
        {
          title: "शीर्षक के अनुसार",
          name: "titleAsc",
          by: [{ field: "title", direction: "asc" }],
        },
      ],
      preview: {
        select: {
          title: "title",
          media: "mainImage",
          category: "category.name",
          publishedAt: "publishedAt",
        },
        prepare(selection) {
          const { title, media, category, publishedAt } = selection;
          const formattedDate = publishedAt
            ? new Date(publishedAt).toLocaleDateString("hi-IN")
            : "तारीख नहीं";
          return {
            title,
            media,
            subtitle: `${category || "बिना श्रेणी"} • ${formattedDate}`,
          };
        },
      },
    },

    // Block Content Schema
    {
      name: "blockContent",
      title: "Block Content",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [
            { title: "सामान्य", value: "normal" },
            { title: "शीर्षक 1", value: "h1" },
            { title: "शीर्षक 2", value: "h2" },
            { title: "शीर्षक 3", value: "h3" },
            { title: "उद्धरण", value: "blockquote" },
          ],
          lists: [
            { title: "बुलेट पॉइंट", value: "bullet" },
            { title: "संख्या सूची", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "मोटा (Bold)", value: "strong" },
              { title: "तिरछा (Italic)", value: "em" },
              { title: "अंडरलाइन", value: "underline" },
            ],
            annotations: [
              {
                title: "लिंक",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                  {
                    title: "नई विंडो में खोलें",
                    name: "blank",
                    type: "boolean",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          title: "तस्वीर",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "कैप्शन",
              type: "string",
              description: "तस्वीर के नीचे दिखने वाला टेक्स्ट",
            },
          ],
        },
        {
          type: "object",
          name: "gallery",
          title: "फोटो गैलरी",
          fields: [
            {
              name: "images",
              title: "तस्वीरें",
              type: "array",
              of: [
                {
                  type: "image",
                  options: {
                    hotspot: true,
                    accept: "image/*",
                  },
                },
              ],
              options: {
                layout: "grid",
              },
              validation: (Rule) =>
                Rule.min(1).error("कम से कम एक तस्वीर जोड़ें"),
            },
          ],
        },
        {
          type: "object",
          name: "break",
          title: "पेज ब्रेक",
          fields: [
            {
              name: "style",
              type: "string",
              options: {
                list: ["break", "line"],
              },
            },
          ],
        },
      ],
    },
  ],
};
