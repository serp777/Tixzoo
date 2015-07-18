ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install wget
sudo mkdir "$1"
cd "$1"
sudo mkdir img
sudo git clone https://github.com/serp777/Tixzoo.git
sudo git init
sudo git add .
sudo git commit -m 'build new bucket'
sudo git remote add origin https://github.com/serp777/Tixzoo.git
sudo git push -u origin master
sudo git checkout master
cd Tixzoo
sudo wget https://drive.google.com/file/d/0B5ld2CqQANLaMG4tYmhvMTJGTUk/view?usp=sharing
sudo unzip images.zip img/
cd ..
cd ..
sudo chmod -R 777 "$1"
