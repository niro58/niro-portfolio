#!/bin/bash
set -e

kubectl config use-context personal

echo "=== Building niro-portfolio ==="
docker build --no-cache -f ./Dockerfile -t ghcr.io/niro58/niro-portfolio:latest .

echo "=== Pushing niro-portfolio ==="
docker push ghcr.io/niro58/niro-portfolio:latest

echo "=== Deploying niro-portfolio ==="
kubectl apply -f .k8s/deployment.yaml
kubectl apply -f .k8s/service.yaml
kubectl apply -f .k8s/ingress.yaml
kubectl rollout restart deployment/niro-portfolio -n personal

echo "=== Done ==="
