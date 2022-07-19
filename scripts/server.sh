#!/bin/bash

#tested for installation on Google VM (Debian 10)
USER=cpokeradmin

#add user
sudo useradd -u 1002 -s /bin/bash -m -p $(openssl passwd -1 p4zzw0aab) $USER 
sudo usermod -aG sudo $USER
sudo usermod -aG www-data $USER
#update password afterwards using command 'passwd'

#enable PasswordAuthentication
sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config; 

#disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config; 
sudo systemctl restart sshd;

#things missing from base instal
sudo apt update
sudo apt upgrade -y
sudo apt-get install software-properties-common curl -y

#letsencrypt
#add-apt-repository ppa:certbot/certbot -yes
sudo apt install certbot -y

#nodejs
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

#apt-get update not required as nodejs setup script above calls it
sudo service apache2 stop
sudo apt-get remove apache2 -y
sudo apt-get install ufw unzip zip ntp git fail2ban build-essential nginx python3-certbot-nginx nodejs -y

#configure firewall
sudo ufw allow 22
sudo ufw --force enable
sudo ufw allow 'Nginx Full'
sudo ufw status verbose

#install forever
sudo npm install forever -g

#mongodb
sudo apt install wget
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod



#sudo -u $USER cp /tmp/install_files/*.sh /home/$USER
sudo -u $USER cp ./vagrant/game_server/install_files/* /home/$USER
sudo -u $USER cp ./vagrant/game_server/install_files/.htpasswd /home/$USER/.htpasswd
sudo chmod +x /home/$USER/*.sh

#setup websites
sudo cp /home/$USER/poker_site_nginx /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/poker_site_nginx /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default 

sudo nginx -t

#cp /tmp/install_files/.htpasswd /etc/nginx/
sudo cp /home/$USER/.htpasswd /etc/nginx/

sudo mkdir -p /opt/poker/poker.engine
#tar -xvf /tmp/install_files/GeoLite2-Country.tar.gz -C /opt/poker/poker.engine --wildcards "*.mmdb" --strip-components 1

#cp /home/$USER/game_server.env /opt/poker.engine/.env
sudo cp /home/$USER/game_server.env /opt/poker/poker.engine/.env

sudo mkdir -p /var/www/poker.site
sudo chown -R www-data:www-data /var/www/poker.site
sudo chmod 775 /var/www/poker.site

# Update the list of packages
sudo apt-get update
# Install pre-requisite packages.
sudo apt-get install -y wget apt-transport-https software-properties-common
# Download the Microsoft repository GPG keys
wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
# Register the Microsoft repository GPG keys
sudo dpkg -i packages-microsoft-prod.deb
# Update the list of packages after we added packages.microsoft.com
sudo apt-get update
# Install PowerShell
sudo apt-get install -y powershell

#cp /tmp/install_files/poker.service /etc/systemd/system/
#systemctl enable poker.service

sudo pwsh x.ps1
