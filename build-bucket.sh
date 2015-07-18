sudo mkdir "$1"
cd "$1"
sudo mkdir img
git init
git add .
git commit -m 'build new bucket'
git remote add origin https://github.com/serp777/Tixzoo.git
git push -u origin master
git checkout master
wget https://drive.google.com/file/d/0B5ld2CqQANLaMG4tYmhvMTJGTUk/view?usp=sharing
unzip images.zip img/
cd ..
sudo chmod -R 777 "$1"
