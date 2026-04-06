"""Week 04 — Closest Pair of Points Visualizer (Flask backend)"""

import math
import random
import time

from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="static")


# ---------------------------------------------------------------------------
# Algorithms
# ---------------------------------------------------------------------------

def dist(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)


def closest_pair_bruteforce(points):
    """Brute force — O(n^2)."""
    n = len(points)
    min_dist = float("inf")
    pair = None
    for i in range(n):
        for j in range(i + 1, n):
            d = dist(points[i], points[j])
            if d < min_dist:
                min_dist = d
                pair = (points[i], points[j])
    return min_dist, pair


def closest_pair_dc(points):
    """Divide and conquer — O(n log^2 n)."""
    pts = sorted(points, key=lambda p: p[0])
    return _closest_dc(pts)


def _closest_dc(pts):
    n = len(pts)
    if n <= 3:
        return closest_pair_bruteforce(pts)

    mid = n // 2
    mid_x = pts[mid][0]

    left_result = _closest_dc(pts[:mid])
    right_result = _closest_dc(pts[mid:])

    d = min(left_result[0], right_result[0])
    best = left_result if left_result[0] <= right_result[0] else right_result

    strip = [p for p in pts if abs(p[0] - mid_x) < d]
    strip.sort(key=lambda p: p[1])

    for i in range(len(strip)):
        j = i + 1
        while j < len(strip) and strip[j][1] - strip[i][1] < d:
            dd = dist(strip[i], strip[j])
            if dd < d:
                d = dd
                best = (dd, (strip[i], strip[j]))
            j += 1

    return best


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    n = int(data.get("n", 50))
    n = max(2, min(n, 50000))
    points = [
        [round(random.uniform(10, 790), 2), round(random.uniform(10, 590), 2)]
        for _ in range(n)
    ]
    return jsonify({"points": points})


@app.route("/closest-pair", methods=["POST"])
def closest_pair():
    data = request.get_json()
    points = [tuple(p) for p in data["points"]]

    # Brute force
    t0 = time.perf_counter()
    bf_dist, bf_pair = closest_pair_bruteforce(points)
    bf_time = time.perf_counter() - t0

    # Divide & Conquer
    t0 = time.perf_counter()
    dc_dist, dc_pair = closest_pair_dc(points)
    dc_time = time.perf_counter() - t0

    speedup = bf_time / dc_time if dc_time > 0 else float("inf")

    return jsonify({
        "bruteforce": {
            "distance": bf_dist,
            "pair": [list(bf_pair[0]), list(bf_pair[1])],
            "time_ms": round(bf_time * 1000, 4),
        },
        "dc": {
            "distance": dc_dist,
            "pair": [list(dc_pair[0]), list(dc_pair[1])],
            "time_ms": round(dc_time * 1000, 4),
        },
        "speedup": round(speedup, 2),
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
