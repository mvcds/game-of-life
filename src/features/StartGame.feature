Feature: Start Game
  As a user
  I want to start playing the game
  So that I can see how my layout reacts

  Scenario: Empty board
    Given I draw an empty board
    When I start the game
    Then the game status changes to "RUNNING"
