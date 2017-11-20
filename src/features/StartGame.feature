Feature: Start Game
  As a user
  I want to start playing the game
  So that I can see how my layout reacts

  Scenario: Start a random board
    Given I draw a "Random" board
    When I start the game
    Then the game status changes to "RUNNING"
      And the game stops at 0
