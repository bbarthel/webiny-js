import shortId from "shortid";
import { locales } from "./mockI18NLocales";
import contentModelGroup from "./contentModelGroup";

export default [
    {
        title: "Category",
        description: "Product category",
        modelId: "category",
        group: contentModelGroup.id,
        fields: [
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Title" }]
                },
                type: "text",
                fieldId: "title",
                name: "title",
                unique: false,
                validation: [
                    {
                        name: "required",
                        message: {
                            values: [{ locale: locales.en.id, value: "This field is required" }]
                        }
                    },
                    {
                        name: "minLength",
                        message: {
                            values: [
                                { locale: locales.en.id, value: "Enter at least 3 characters" }
                            ]
                        },
                        settings: {
                            min: 3.0
                        }
                    }
                ]
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Slug" }]
                },
                type: "text",
                fieldId: "slug",
                name: "slug",
                unique: true,
                validation: [
                    {
                        name: "required",
                        message: {
                            values: [{ locale: locales.en.id, value: "This field is required" }]
                        }
                    }
                ]
            }
        ]
    },
    {
        title: "Review",
        description: "Product review",
        modelId: "review",
        group: contentModelGroup.id,
        fields: [
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Text" }]
                },
                type: "text",
                unique: false,
                fieldId: "text",
                name: "text",
                validation: [
                    {
                        name: "required",
                        message: {
                            values: [{ locale: locales.en.id, value: "This field is required" }]
                        }
                    }
                ]
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Product" }]
                },
                type: "ref",
                unique: false,
                fieldId: "product",
                name: "product",
                validation: [],
                settings: {
                    type: "one",
                    modelId: "product"
                }
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Rating" }]
                },
                type: "float",
                unique: false,
                fieldId: "rating",
                name: "rating",
                validation: []
            }
        ]
    },
    {
        title: "Product",
        modelId: "product",
        description: "Products being sold in our webshop",
        group: contentModelGroup.id,
        fields: [
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Title" }]
                },
                fieldId: "title",
                name: "title",
                unique: false,
                type: "text",
                validation: [
                    {
                        name: "required",
                        message: {
                            values: [
                                { locale: locales.en.id, value: "Please enter a product name" }
                            ]
                        }
                    }
                ]
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Category" }]
                },
                fieldId: "category",
                name: "category",
                unique: false,
                type: "ref",
                validation: [
                    {
                        name: "required",
                        message: {
                            values: [{ locale: locales.en.id, value: "Please select a category" }]
                        }
                    }
                ],
                settings: {
                    type: "one",
                    modelId: "category"
                }
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Reviews" }]
                },
                fieldId: "reviews",
                name: "reviews",
                type: "ref",
                unique: false,
                validation: [],
                settings: {
                    type: "many",
                    modelId: "review"
                }
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Price" }]
                },
                fieldId: "price",
                name: "price",
                unique: false,
                type: "float",
                validation: [
                    {
                        name: "required",
                        message: {
                            values: [{ locale: locales.en.id, value: "Please enter a price" }]
                        }
                    }
                ]
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Price" }]
                },
                fieldId: "inStock",
                name: "inStock",
                unique: false,
                type: "boolean",
                validation: []
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Price" }]
                },
                fieldId: "itemsInStock",
                name: "itemsInStock",
                unique: false,
                type: "integer",
                validation: []
            },
            {
                _id: shortId.generate(),
                label: {
                    values: [{ locale: locales.en.id, value: "Available on" }]
                },
                fieldId: "availableOn",
                name: "availableOn",
                unique: false,
                type: "datetime",
                settings: {
                    type: "date"
                },
                validation: [
                    {
                        name: "required",
                        message: {
                            values: [{ locale: locales.en.id, value: "Please enter a date" }]
                        }
                    }
                ]
            }
        ]
    }
];