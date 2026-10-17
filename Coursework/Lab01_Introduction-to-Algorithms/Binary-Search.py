# === Binary Search ===
# An algorithm to efficiently find a specific value in a sorted array
# Compares two implementations: iterative and recursive approaches.
#
# Time complexity: O(log n) — the search range is halved at each step
# Space complexity: Iterative O(1), Recursive O(log n) (call stack)
"""Binary Search - Iterative and Recursive implementations."""


def binary_search_iterative(arr, target):
    """
    Iterative binary search: returns the index of target in sorted array arr.
    Returns -1 if not found.

    Algorithm:
      1. Set the left and right boundaries of the search range
      2. Compare the middle value (mid) with target
      3. If target is larger, narrow to the right half; if smaller, narrow to the left half
      4. If the range becomes invalid (left > right), the search fails

    Time complexity: O(log n)
    Space complexity: O(1) — no additional memory used
    """
    left, right = 0, len(arr) - 1  # Initialize search range: entire array
    while left <= right:  # Repeat while the search range is valid
        mid = (left + right) // 2  # Calculate middle index (integer division)
        if arr[mid] == target:  # If middle value matches target, search succeeds
            return mid
        elif arr[mid] < target:  # If middle value is less than target, search right half
            left = mid + 1
        else:  # If middle value is greater than target, search left half
            right = mid - 1
    return -1  # Search range exhausted -> target is not in the array


def binary_search_recursive(arr, target, left, right):
    """
    Recursive binary search: returns the index of target in sorted array arr[left..right].
    Returns -1 if not found.

    Algorithm:
      - Base case: if left > right, the search fails
      - Recursive step: compare middle value and recursively call on the appropriate half

    Time complexity: O(log n)
    Space complexity: O(log n) — recursive call stack depth
    """
    if left > right:  # Base case: search range is empty, search fails
        return -1
    mid = (left + right) // 2  # Calculate middle index
    if arr[mid] == target:  # If middle value is target, search succeeds
        return mid
    elif arr[mid] < target:  # Target is in the right half
        return binary_search_recursive(arr, target, mid + 1, right)
    else:  # Target is in the left half
        return binary_search_recursive(arr, target, left, mid - 1)


if __name__ == "__main__":
    data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]  # Sorted test array
    target = 7  # Value to search for

    # Run iterative binary search
    idx = binary_search_iterative(data, target)
    print(f"Iterative: {target} found at index {idx}")

    # Run recursive binary search
    idx = binary_search_recursive(data, target, 0, len(data) - 1)
    print(f"Recursive: {target} found at index {idx}")

    # Step-by-step trace: visualize how binary search narrows the range
    print(f"\n--- Binary Search Trace for target={target} ---")
    left, right = 0, len(data) - 1
    step = 1
    while left <= right:
        mid = (left + right) // 2
        print(f"Step {step}: range=[{left},{right}], mid={mid}, arr[mid]={data[mid]}")
        if data[mid] == target:
            print(f"  -> Found at index {mid}!")
            break
        elif data[mid] < target:
            print(f"  -> {data[mid]} < {target}, search right half")
            left = mid + 1  # Narrow range to right half
        else:
            print(f"  -> {data[mid]} > {target}, search left half")
            right = mid - 1  # Narrow range to left half
        step += 1
