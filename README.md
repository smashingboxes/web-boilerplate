[![Stories in Ready](https://badge.waffle.io/smashingboxes/web-boilerplate.png?label=ready&title=Ready)](https://waffle.io/smashingboxes/web-boilerplate)
# web-boilerplate
A template for new front-end projects.
[Waffle.io Board](https://waffle.io/smashingboxes/web-boilerplate)

## Info

- Yarn 1.3.2
- Node 8.9.4

## Using
*NOTE: There are some additional steps for setting up a new project that are documented [here](https://github.com/smashingboxes/development-wiki/blob/master/technobabble/setting_up_a_new_project.md). The steps documented here are just the ones needed to set up the code for the repo.*

### Initing with a script
*NOTE: this is an experimental script, run with caution
1. Clone the repo
```
git clone https://github.com/smashingboxes/web-boilerplate
```
2. Create your repo on GitHub
it should look something like https://github.com/smashingboxes/my-project
3. Go into web-boilerplate
```
cd web-boilerplate/
```
4. Run an init script
```
./init.sh
```

## or

### Follow these steps
1. Clone the repo
```
git clone https://github.com/smashingboxes/web-boilerplate
```
2. Move `web-boilerplate` to your project name
```
mv web-boilerplate *PROJECT_NAME*
cd *PROJECT_NAME*
```
3. Delete the .git folder inside it
```
rm -rf .git
```
4. Run a new git init
```
git init
```
5. Change the package.json file to information about your project
6. Delete this README and create a new one for your project
7. Create a new branch titled `initial-setup`
```
git checkout -b initial-setup
```
8. Commit all the files as an initial commit and push to your origin
```
git remote set-url origin https://github.com/smashingboxes/*PROJECT_NAME*.git
git add .
git commit -m "Initial commit"
git push origin initial-setup
```
7. [Create a pull request](https://github.com/smashingboxes/development-wiki/blob/master/technobabble/code_quality/code_review_policy.md)

## Commands

Run the server with:
```
yarn start
```

Run your tests with:
```
yarn test
```

Run a build with:
```
yarn build
```

## Docker Commands

### Docker is not needed to run the boilerplate

Build and start the server:
```
docker-compose up --build
```

Run your tests with:
```
docker-compose exec web yarn test
```

Run a build with:
```
docker-compose exec web yarn build
```

If your terminal closes run:
```
docker-compose logs --follow
```
