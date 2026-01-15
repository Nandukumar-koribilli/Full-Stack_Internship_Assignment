#!/bin/bash

# Health check script for backend
# Usage: ./health-check.sh <url>

URL="${1:-http://localhost:5000/health}"
MAX_RETRIES=30
RETRY_INTERVAL=2

echo "Checking health of: $URL"

for i in $(seq 1 $MAX_RETRIES); do
    echo "Attempt $i/$MAX_RETRIES..."
    
    if curl -f -s "$URL" > /dev/null; then
        echo "✅ Health check passed!"
        exit 0
    fi
    
    if [ $i -lt $MAX_RETRIES ]; then
        echo "⏳ Service not ready, waiting ${RETRY_INTERVAL}s..."
        sleep $RETRY_INTERVAL
    fi
done

echo "❌ Health check failed after $MAX_RETRIES attempts"
exit 1
