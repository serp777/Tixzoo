ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install wget
sudo mkdir "$1"
cd "$1"
sudo git clone https://github.com/serp777/Tixzoo.git
cd Tixzoo
sudo git init
sudo git add .
sudo git commit -m 'build new bucket'
sudo git remote add origin https://github.com/serp777/Tixzoo.git
sudo git push -u origin master
sudo git checkout master
sudo mkdir img
sudo wget -O images.zip https://googledrive.com/host/0B5ld2CqQANLaMG4tYmhvMTJGTUk
sudo unzip images.zip -d img/
cd ..
cd ..
sudo chmod -R 777 "$1"
