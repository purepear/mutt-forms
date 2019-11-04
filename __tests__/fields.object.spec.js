"use strict"

import Mutt from "../src/index"
import { Validator } from "../src/validators"

describe("Object Field", () => {
  test("test objects serialize correctly", () => {
    const schema = {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        email: {
          type: "string"
        }
      }
    }

    const options = {
      email: {
        serialize: "trim"
      }
    }

    const field = Mutt.fields.ObjectField.new("test", "test", schema, options)

    field.value = {
      name: "Testing",
      email: " test@example.com "
    }

    expect(field.getSerializedValue()).toEqual({
      name: "Testing",
      email: "test@example.com"
    })
  })

  test("objects support anyOf syntax for child components", () => {
    const schema = {
      type: "object",
      properties: {
        allOf: [
          {
            name: {
              type: "string"
            },
            other: {
              type: "string"
            }
          },
          {
            telephone: {
              type: "string"
            }
          }
        ]
      }
    }

    const field = Mutt.fields.ObjectField.new("test", "test", schema, {})

    // To test this, we expect that each item accepts both
    // a name and telephone
    field.value = {
      name: "example",
      other: "test",
      telephone: "01234567890"
    }

    const nameField = field.getFieldByPath("name")
    const otherField = field.getFieldByPath("other")
    const telField = field.getFieldByPath("telephone")

    expect(nameField.value).toEqual("example")
    expect(otherField.value).toEqual("test")
    expect(telField.value).toEqual("01234567890")
  })

  describe("validator", () => {
    const schema = {
      type: "object",
      properties: {
        colour: {
          type: "string"
        },
        name: {
          type: "string"
        },
        email: {
          type: "string"
        }
      }
    }
    class NoMuppetsValidator extends Validator {
      validate(value) {
        if (value.name == "Kermit" || value.email.endsWith("muppets.com")) {
          this.error = {
            name: "Muppets are not allowed",
            email: "Muppets are not allowed"
          }
          return false
        }

        return true
      }
    }
    class NoTestEmailsValidator extends Validator {
      validate(value) {
        if (value === "test@example.com") {
          this.error = "Only real email addresses are allowed"
          return false
        }
        return true
      }
    }

    const options = {
      email: {
        validators: [new NoTestEmailsValidator()]
      },
      validators: [new NoMuppetsValidator()]
    }

    const field = Mutt.fields.ObjectField.new("test", "test", schema, options)

    test("allows valid values", () => {
      field.value = {
        colour: "green",
        name: "Wonder Woman",
        email: "wonderwoman@example.com"
      }

      expect(field.validate()).toBe(true)
    })

    test("errors on invalid values", () => {
      field.value = {
        colour: "green",
        name: "Kermit",
        email: "test@example.com"
      }
      field.object.name.widget.refreshErrorState = jest.fn()
      field.object.email.widget.refreshErrorState = jest.fn()

      expect(field.validate()).toBe(false)
      expect(field.errors).toEqual({
        name: ["Muppets are not allowed"],
        email: [
          "Only real email addresses are allowed",
          "Muppets are not allowed"
        ]
      })
      expect(field.object.colour.errors).toEqual([])
      expect(field.object.email.errors).toEqual([
        "Only real email addresses are allowed",
        "Muppets are not allowed"
      ])
      expect(field.object.email.widget.refreshErrorState).toHaveBeenCalledWith([
        "Only real email addresses are allowed",
        "Muppets are not allowed"
      ])
      expect(field.object.name.errors).toEqual(["Muppets are not allowed"])
      expect(field.object.name.widget.refreshErrorState).toHaveBeenCalledWith([
        "Muppets are not allowed"
      ])
    })
  })
})
