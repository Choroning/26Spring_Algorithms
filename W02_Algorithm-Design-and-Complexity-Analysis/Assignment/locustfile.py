"""
@file    locustfile.py
@brief   Locust load testing script for product search API
@author  Cheolwon Park
@date    2026-03-18
"""

from locust import HttpUser, task
class ShopUser(HttpUser):
    @task
    def search_by_id(self):
        self.client.get("/search/id?id=42")
    @task
    def search_by_name(self):
        self.client.get("/search/name?q=laptop")
    @task
    def find_duplicates(self):
        self.client.get("/search/duplicates")
