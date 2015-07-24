sudo mkdir "$1"
sudo git clone https://github.com/serp777/Tixzoo.git
sudo cp -R Tixzoo/ "$1"/
sudo rm -Rf Tixzoo
sudo chmod -R 777 "$1"
cd "$1"
sudo git init
sudo git add .
sudo git commit -m 'build new bucket'
sudo git remote add origin https://github.com/serp777/Tixzoo.git
sudo git push -u origin master
sudo git checkout master
sudo curl -L "https://googledrive.com/host/0B5ld2CqQANLaMG4tYmhvMTJGTUk" > images.zip
sudo unzip images.zip -d img/
cd ..

