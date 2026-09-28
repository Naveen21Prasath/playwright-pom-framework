Feature: Login

  Scenario: Standard user reaches the inventory
    Given the login page is open
    When the standard user signs in
    Then the inventory page shows products
