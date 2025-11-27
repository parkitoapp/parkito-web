// import { defineType, defineField } from 'sanity'

// export default defineType({
//     name: 'blogPost',
//     title: 'Blog Post',
//     type: 'document',
//     fields: [
//         defineField({
//             name: 'title',
//             title: 'Title',
//             type: 'string',
//             validation: rule => rule.required(),
//         }),
//         defineField({
//             name: 'slug',
//             title: 'Slug',
//             type: 'slug',
//             options: {
//                 source: 'title',
//                 maxLength: 96,
//             },
//             validation: rule => rule.required(),
//         }),
//         defineField({
//             name: 'publishedAt',
//             title: 'Published At',
//             type: 'datetime',
//             initialValue: () => new Date().toISOString(),
//         }),
//         defineField({
//             name: 'coverImage',
//             title: 'Cover Image',
//             type: 'image',
//             options: { hotspot: true },
//         }),
//         defineField({
//             name: 'body',
//             title: 'Body',
//             type: 'array',
//             of: [{ type: 'block' }],
//         }),
//     ],
// })


import { defineField, defineType } from "sanity";
import { v4 as uuidv4 } from "uuid"; // optional, used in initialValue

export default defineType({
    name: "blogPost",
    title: "Blog Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),

        // -------------------------
        // TAGS
        // -------------------------
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
            validation: (rule) => rule.required().min(1),
        }),

        // -------------------------
        // AUTHOR
        // -------------------------
        defineField({
            name: "author",
            title: "Author",
            type: "object",
            fields: [
                defineField({
                    name: "name",
                    title: "Name",
                    type: "string",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "role",
                    title: "Role",
                    type: "string",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "image",
                    title: "Image",
                    type: "image",
                    options: { hotspot: true },
                }),
            ],
        }),

        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
        }),

        defineField({
            name: "recap",
            title: "In Breve",
            type: "array",
            of: [{ type: "block" }],
            validation: (rule) => rule.required(),
        }),

        // -------------------------
        // CONTENT SECTIONS
        // -------------------------
        defineField({
            name: "content",
            title: "Sections",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Section",
                    fields: [
                        // **** ID FOR LINKING IN TOC ****
                        defineField({
                            name: "id",
                            title: "Section ID",
                            type: "string",
                            description: "Auto-generato, da sostituire con il section title tutto minuscolo e - al posto degli spazi",
                            initialValue: () => uuidv4(),
                            validation: (rule) => rule.required(),
                        }),

                        defineField({
                            name: "title",
                            title: "Section Title",
                            type: "string",
                            validation: (rule) => rule.required(),
                        }),

                        // **** MULTIPLE IMAGES PER SECTION ****
                        defineField({
                            name: "images",
                            title: "Images",
                            type: "array",
                            of: [
                                {
                                    type: "image",
                                    options: { hotspot: true },
                                },
                            ],
                        }),

                        // **** RICH TEXT BODY ****
                        defineField({
                            name: "body",
                            title: "Body",
                            type: "array",
                            of: [{ type: "block" }],
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: "title" },
                    },
                },
            ],
        }),
    ],
});
