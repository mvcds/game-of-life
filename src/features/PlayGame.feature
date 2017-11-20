Feature: Play Game
  As a user
  I want to be able play the game
  So that I can control its interactions

  Scenario: All Dead board
    Given I draw a "AllDead" board
    When I "start" the game
    Then the game stops at 0

  Scenario: Simplest board
    Given I draw a "OneCellInMiddle" board
    When I "start" the game
    Then the game stops at 1

