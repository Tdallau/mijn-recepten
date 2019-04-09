FROM microsoft/dotnet:2.2-sdk AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

RUN buildDeps='gnupg' \
     && set -x \
     && apt-get update && apt-get install -y $buildDeps --no-install-recommends \
     && rm -rf /var/lib/apt/lists/* \
     && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
     && apt install nodejs \
     && rm -rf /usr/lib/systemd/* \
     && apt-get purge -y --auto-remove $buildDeps \
     && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
     && node -v

RUN npm install

# Copy everything else and build
COPY . ./
RUN dotnet publish /p:Configuration=Release /p:EnvironmentName=Production -o out

# Build runtime image
FROM microsoft/dotnet:2.2-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "mijn-recepten.dll"]