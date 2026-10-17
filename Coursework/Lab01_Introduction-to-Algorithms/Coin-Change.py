# === Coin Change Problem — Greedy Approach ===
# A greedy algorithm that always uses the largest coin first when making change
#
# Note: The greedy algorithm does NOT always guarantee an optimal solution!
# - Optimal for standard currency denominations (e.g., 500, 100, 50, 10)
# - May not be optimal for non-standard denominations (e.g., 1, 3, 4)
#   -> Use dynamic programming (DP) when an optimal solution is required.
#
# Time complexity: O(amount / smallest_coin + k log k), k = number of coin types
# Space complexity: O(amount / smallest_coin) — size of the result list
"""Coin Change - Greedy approach demonstration."""


def coin_change_greedy(amount, coins):
    """
    Greedy coin change algorithm: always selects the largest available coin first.
    Returns the list of coins used.

    Algorithm:
      1. Sort coins in descending order (largest coin first)
      2. For each coin, use it as many times as possible
      3. If remaining amount reaches 0, success; otherwise, failure (return None)

    Note: The greedy approach does NOT always guarantee the optimal solution (minimum number of coins)!
    """
    coins_sorted = sorted(coins, reverse=True)  # Sort coins from largest to smallest
    result = []  # List to store coins used
    remaining = amount  # Remaining amount to make change for

    for coin in coins_sorted:  # Try each coin starting from the largest
        while remaining >= coin:  # Repeat while the current coin can be used
            result.append(coin)  # Record coin usage
            remaining -= coin  # Subtract from remaining amount

    if remaining > 0:  # Cannot make exact change
        return None  # Cannot make exact change
    return result


if __name__ == "__main__":
    # Case 1: Greedy is optimal (standard currency denominations)
    # 500, 100, 50, 10 — larger denominations are multiples of smaller ones -> greedy is optimal
    coins1 = [500, 100, 50, 10]
    amount1 = 1260
    result1 = coin_change_greedy(amount1, coins1)
    print(f"Amount: {amount1}, Coins: {coins1}")
    print(f"Greedy result: {result1} ({len(result1)} coins)\n")

    # Case 2: Greedy fails (non-standard coins)
    # 6 = 4+1+1 (greedy: 3 coins) vs 6 = 3+3 (optimal: 2 coins)
    # Greedy selects the largest coin (4) first, missing the optimal solution
    coins2 = [1, 3, 4]
    amount2 = 6
    result2 = coin_change_greedy(amount2, coins2)
    print(f"Amount: {amount2}, Coins: {coins2}")
    print(f"Greedy result: {result2} ({len(result2)} coins)")
    print(f"Optimal: [3, 3] (2 coins) — Greedy is NOT optimal here!")
