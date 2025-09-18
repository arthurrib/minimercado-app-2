web: bash -lc 'set -euo pipefail; JAR=$(ls build/libs/*-SNAPSHOT.jar 2>/dev/null || ls build/libs/*.jar); exec java -Dserver.port=$PORT $JAVA_OPTS -jar "$JAR" --spring.profiles.active=prod,heroku'
