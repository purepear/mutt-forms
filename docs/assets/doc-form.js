var docSchema = {
    title: 'Test Form',
    properties: {
        string: {
            type: "string",
            title: "String Field",
            default: "Test String Value"
        },
        text: {
            type: "string",
            title: "Text Field"
        },
        email: {
            type: "string",
            title: "Email Field",
            format: "email"
        },
        integer: {
            type: "integer",
            title: "Integer Field"
        },
        password: {
            type: "string",
            title: "Password Field"
        },
        display: {
            type: "string",
            title: "Display Only",
            default: "Display Only Value"
        },
        hidden: {
            type: "string",
            title: "Hidden Field"
        },
        bool: {
            type: "boolean",
            title: "Boolean Field"
        },
        select: {
            type: "string",
            title: "Choice - Select Field",
            enum: [
                "OPTION_1",
                "OPTION_2"
            ]
        },
        radio: {
            type: "string",
            title: "Choice - Radio Field",
            enum: [
                "OPTION_1",
                "OPTION_2"
            ]
        },
        radioBool: {
            type: "boolean",
            title: "Boolean - Radio Field"
        },
        array: {
            type: "array",
            minItems: 2,
            maxItems: 4,
            items: {
                type: "string",
                title: "Array Item"
            }
        },
        date: {
            type: "string",
            title: "Date Field"
        },
        object: {
            type: "object",
            properties: {
                property1: {
                    type: "string",
                    title: "Object Property 1"
                },
                property2: {
                    type: "string",
                    title: "Object Property 2"
                }
            }
        },
        objectArray: {
            type: "array",
            minItems: 2,
            maxItems: 4,
            items: {
                type: "object",
                title: "Object Array Item",
                properties: {
                    property1: {
                        type: "string",
                        title: "Object Array Property 1"
                    },
                    property2: {
                        type: "string",
                        title: "Object Array Property 2"
                    }
                }
            }
        },
        required: {
            type: "string",
            title: "Required Field",
            required: true
        },
    }
};


var docOptions = {
    form: {
        label: "Custom Legend"//,
        // fieldsets: [
        //     {
        //         fields: {
        //             display: {},
        //             radioBool: {}
        //         }
        //     }
        // ]
    },
    fields: {
        display: {
            widget: "display"
        },
        radioBool: {
            widget: "radio"
        },
        password: {
            widget: "password"
        },
        hidden: {
            //hidden: true
            widget: "hidden"
        },
        text: {
            widget: "textarea"
        },
        date: {
            widget: "date"
        },
        radio: {
            widget: "radio"
        }
    }
};