#!/bin/bash
APPS_DIR="apps"

# Ensure we are in backend dir
cd "$(dirname "$0")"

echo "Using Database URL base: postgresql://postgres:postgres@localhost:5432/"

for app_path in "$APPS_DIR"/*; do
    if [ -d "$app_path" ] && [ -f "$app_path/prisma/schema.prisma" ]; then
        app_name=$(basename "$app_path")
        
        # Calculate DB name
        # Replace - with _
        db_name_base=${app_name//-/_}
        # Remove _service suffix if present
        db_name_base=${db_name_base%_service}
        # Append _db
        db_name="${db_name_base}_db"
        
        echo "Processing $app_name -> DB: $db_name"
        
        export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/${db_name}?schema=public"
        
        echo "Pushing schema for $app_name..."
        npx prisma db push --schema "$app_path/prisma/schema.prisma" --accept-data-loss --skip-generate
        
        if [ $? -ne 0 ]; then
            echo "❌ Failed to migrate $app_name"
        else 
            echo "✅ Successfully migrated $app_name"
        fi
        echo "-----------------------------------"
    fi
done
