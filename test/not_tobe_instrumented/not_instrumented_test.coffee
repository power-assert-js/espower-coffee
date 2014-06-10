empower = require("empower")
formatter = require("power-assert-formatter")()
assert = empower(require("assert"), formatter)
expect = require("expect.js")

describe "power-assert client should work with not-instrumented code", ->
  beforeEach ->
    @expectAssertMessage = (body) ->
      try
        body()
        expect().fail "AssertionError should be thrown"
      catch e
        expect(e.name).to.be "AssertionError"
        expect(e.message).to.be "plain assertion message"

  it "Nested CallExpression with BinaryExpression: assert((three * (seven * ten)) === three);", ->
    one = 1
    two = 2
    three = 3
    seven = 7
    ten = 10
    @expectAssertMessage ->
      assert.ok (three * (seven * ten)) is three, "plain assertion message"

  it "equal with Literal and Identifier: assert.equal(1, minusOne);", ->
    minusOne = -1
    @expectAssertMessage ->
      assert.equal 1, minusOne, "plain assertion message"
