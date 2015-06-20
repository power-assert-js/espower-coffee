empower = require("empower")
formatter = require("power-assert-formatter")()
assert = empower(require("assert"), formatter)
expect = require("expect.js")

describe "power-assert message", ->

  it "Nested CallExpression with BinaryExpression: assert((three * (seven * ten)) === three);", ->
    one = 1
    two = 2
    three = 3
    seven = 7
    ten = 10
    @expectPowerAssertMessage (->
      assert (three * (seven * ten)) is three
    ), [
      "  assert(three * (seven * ten) === three)"
      "         |     |  |     | |    |   |     "
      "         |     |  |     | |    |   3     "
      "         |     |  |     | 10   false     "
      "         |     |  7     70               "
      "         3     210                       "
      "  "
      "  [number] three"
      "  => 3"
      "  [number] three * (seven * ten)"
      "  => 210"
    ], "  # test/tobe_instrumented/tobe_instrumented_test.coffee:15"

  it "equal with Literal and Identifier: assert.equal(1, minusOne);", ->
    minusOne = -1
    @expectPowerAssertMessage (->
      assert.equal 1, minusOne
    ), [
      "  assert.equal(1, minusOne)"
      "                  |        "
      "                  -1       "
    ], "  # test/tobe_instrumented/tobe_instrumented_test.coffee:33"

  beforeEach ->
    @expectPowerAssertMessage = (body, expectedDiagram, expectedLine) ->
      try
        body()
        expect().fail "AssertionError should be thrown"
      catch e
        expect(e.message.split("\n")[0]).to.eql expectedLine
        expect(e.message.split("\n").slice(2, -1)).to.eql expectedDiagram
