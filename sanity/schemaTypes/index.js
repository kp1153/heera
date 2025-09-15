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
              // Hindi to English mapping for categories
              const categoryMap = {
                "देश-विदेश": "desh-videsh",
                प्रतिरोध: "pratirodh",
                "जीवन के रंग": "jeevan-ke-rang",
                विविध: "vividh",
                "कला-साहित्य": "kala-sahitya",
                "कृषि-मवेशी": "krishi-maveshi",
              };

              // If direct mapping exists, use it
              if (categoryMap[input]) {
                return categoryMap[input];
              }

              // Otherwise, create slug from input
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
                  .replace(/[\u0900-\u097F]/g, "") // Remove Hindi characters
                  .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
                  .trim()
                  .replace(/\s+/g, "-") // Replace spaces with hyphens
                  .replace(/\-\-+/g, "-") // Replace multiple hyphens with single
                  .replace(/^-+/, "") // Remove leading hyphens
                  .replace(/-+$/, "") || // Remove trailing hyphens
                `post-${Date.now()}`
              ); // Fallback if empty
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
          name: "excerpt",
          title: "संक्षिप्त विवरण",
          type: "text",
          rows: 3,
          description:
            "खबर का छोटा सार (वैकल्पिक - अगर नहीं दिया तो सामग्री से अपने आप बनेगा)",
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
              name: "alt",
              title: "Alt Text (वैकल्पिक पाठ)",
              type: "string",
              description: "तस्वीर का विवरण (SEO के लिए महत्वपूर्ण)",
            },
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
          name: "featured",
          title: "मुख्य समाचार",
          type: "boolean",
          description: "क्या यह मुख्य समाचार है?",
          initialValue: false,
        },
        {
          name: "tags",
          title: "टैग",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
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

    // Block Content Schema for rich text
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
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
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
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "तस्वीर का विवरण",
            },
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

    // Author Schema (वैकल्पिक)
    {
      name: "author",
      title: "लेखक",
      type: "document",
      fields: [
        {
          name: "name",
          title: "नाम",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "name",
            maxLength: 96,
          },
        },
        {
          name: "image",
          title: "तस्वीर",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "bio",
          title: "परिचय",
          type: "array",
          of: [
            {
              title: "Block",
              type: "block",
              styles: [{ title: "Normal", value: "normal" }],
              lists: [],
            },
          ],
        },
      ],
      preview: {
        select: {
          title: "name",
          media: "image",
        },
      },
    },
  ],
};
