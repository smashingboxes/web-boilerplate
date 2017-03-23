# web-boilerplate
A template for new front-end projects.  
[Waffle.io Board](https://waffle.io/smashingboxes/web-boilerplate)

## Using
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
7. Commit all the files as an initial commit and push to your origin
```
git remote set-url origin https://github.com/smashingboxes/*PROJECT_NAME*.git
git add .
git commit -m "Initial commit"
git push origin master
```

## Commands

Run your tests with:
```
npm test
```
Run the server with:
```
npm start
```
Run a build with:
```
npm run build
```
