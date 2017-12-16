Feature: Adjust Board Size
  As a user
  I want to be able adjust the board size
  So that I can play different games

  Scenario: Add Column
    Given a 5 x 5 board
    When I use "addColumn" on board
    Then the board gets 6 "columns"

  Scenario: Add Column Above Maximum
    Given a 25 x 5 board
    When I use "addColumn" on board
    Then the board gets 25 "columns"

  Scenario: Remove Column
    Given a 6 x 5 board
    When I use "removeColumn" on board
    Then the board gets 5 "columns"

  Scenario: Remove Column Below Minimum
    Given a 5 x 5 board
    When I use "removeColumn" on board
    Then the board gets 5 "columns"

  Scenario: Add Row
    Given a 5 x 5 board
    When I use "addRow" on board
    Then the board gets 6 "rows"

  Scenario: Add Row Above Maximum
    Given a 5 x 25 board
    When I use "addRow" on board
    Then the board gets 25 "rows"

  Scenario: Remove Row
    Given a 5 x 6 board
    When I use "removeRow" on board
    Then the board gets 5 "rows"

  Scenario: Remove Row Below Minimum
    Given a 5 x 5 board
    When I use "removeRow" on board
    Then the board gets 5 "rows"

