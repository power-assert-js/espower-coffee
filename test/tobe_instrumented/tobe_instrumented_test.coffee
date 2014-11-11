empower = require("empower")
formatter = require("power-assert-formatter")()
assert = empower(require("assert"), formatter)
expect = require("expect.js")

describe "power-assert message", ->

  beforeEach ->
    @expectPowerAssertMessage = (body, expectedLines) ->
      try
        body()
        expect().fail "AssertionError should be thrown"
      catch e
        expect(e.message.split("\n").slice(2, -1)).to.eql expectedLines

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
    ]

  it "equal with Literal and Identifier: assert.equal(1, minusOne);", ->
    minusOne = -1
    @expectPowerAssertMessage (->
      assert.equal 1, minusOne
    ), [
      "  assert.equal(1, minusOne)"
      "                  |        "
      "                  -1       "
    ]
