Feature: Play Game
  As a user
  I want to be able play the game
  So that I can control its interactions

  Scenario: All Dead game
    Given I draw a "AllDead" game
    When I "start" the game
    Then the game stops at 0

  Scenario: Simplest game
    Given I draw a "OneCellInMiddle" game
    When I "start" the game
    Then the game stops at 1

