#!/bin/sh
echo "what is your PROJECT_NAME?"
read PROJECT_NAME
cd ..
mv web-boilerplate $PROJECT_NAME
cd $PROJECT_NAME
rm -rf .git
git init .

echo "# $PROJECT_NAME

## Commands

Run the server with:
\`\`\`
yarn start
\`\`\`

Run your tests with:
\`\`\`
yarn test
\`\`\`

Run a build with:
\`\`\`
yarn build
\`\`\`

## Docker Commands

### Docker is not needed to run the boilerplate

Build and start the server:
\`\`\`
docker-compose up --build
\`\`\`

Run your tests with:
\`\`\`
docker-compose exec web yarn test
\`\`\`

Run a build with:
\`\`\`
docker-compose exec web yarn build
\`\`\`

If your terminal closes run:
\`\`\`
docker-compose logs --follow
\`\`\`
" > README.md

git add .
git reset ./init.sh
git commit -m "first commit"
git remote add origin https://github.com/smashingboxes/$PROJECT_NAME.git
git push -u origin master

echo "

You're all set. Please check out your project at
https://github.com/smashingboxes/$PROJECT_NAME
"

rm ./init.sh
