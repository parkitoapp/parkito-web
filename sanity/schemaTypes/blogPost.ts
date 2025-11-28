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
            title: "Titolo",
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
            title: "Data di pubblicazione",
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
            title: "Autore",
            type: "object",
            fields: [
                defineField({
                    name: "name",
                    title: "Nome",
                    type: "string",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "role",
                    title: "Ruolo",
                    type: "string",
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: "image",
                    title: "Immagine di autore",
                    type: "image",
                    options: { hotspot: true },
                    validation: (rule) => rule.required(),
                }),
            ],
        }),

        defineField({
            name: "coverImage",
            title: "Immagine di copertina",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "coverAlt",
            title: "Alt Text per copertina",
            type: "string",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "intro",
            title: "Intro",
            type: "array",
            of: [{ type: "block" }],
            validation: (rule) => rule.required(),
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
            title: "Sezioni",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Sezione",
                    fields: [

                        defineField({
                            name: "title",
                            title: "Titolo",
                            type: "string",
                            validation: (rule) => rule.required(),
                        }),

                        // **** MULTIPLE IMAGES PER SECTION ****
                        defineField({
                            name: "image",
                            title: "Immagine di sezione",
                            type: "image"
                        }),

                        defineField({
                            name: "sectionAlt",
                            title: "Alt Text per immagine di sezione",
                            type: "string"
                        }),

                        // **** RICH TEXT BODY ****
                        defineField({
                            name: "body",
                            title: "Corpo",
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
