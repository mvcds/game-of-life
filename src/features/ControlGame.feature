Feature: Control Game
  As a user
  I want to be able to control the game
  So that I can see how it is resolved

  Background:
    Given I draw a "Random" game
    When I "start" the game

  Scenario: Start Game
    Then the game status changes to "RUNNING"

  Scenario: Pause Game
    When I "pause" the game
    Then the game status changes to "PAUSED"

  Scenario: Stop Game
    When I "stop" the game
    Then the game status changes to "IDLE"

  Scenario: Resume Game
    Given I "pause" the game
    When I "resume" the game
    Then the game status changes to "RUNNING"

