1. Create an instance with Ubuntu 16.04 (A Vultr instance w/ 2048MB Memory
   was used when preparing these instructions)
2. SSH to the server and run
   `apt update && apt upgrade -y && shutdown -r now`
3. SSH back into the server and run `tmux` to create a persistent session.
   If you lose connectivity, log back in and run `tmux attach`.
4. Install Docker (this is based on the
   [instructions from Docker][docker-instructions]:
    
    ``` bash
    apt install -y apt-transport-https ca-certificates software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    apt update && apt install -y docker-ce
    ```

    Install using the instructions on the Linux tab on the
    [docker-compose installation instructions][docker-compose-install]:

    ``` bash
    curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ```
5. Now we begin installing GitLab using the [docker-gitlab][docker-gitlab]
   project's [quickstart][docker-gitlab-quickstart] (docker-gitlab is an
   unofficial, alternative way to install GitLab. GitLab's official
   installation instructions insist it needs 4GB memory which is a lot for
   self-hosting). Make a directory for your GitLab configuration and cd 
   into it:

    ```
    mkdir ~/gitlab && cd ~/gitlab
    ```
6. On your local machine, download the
   [docker-compose.yml][docker-compose-yml]. Run the following command
   three times, and after each time replace one of
   `GITLAB_SECRETS_DB_KEY_BASE`, `GITLAB_SECRETS_SECRET_KEY_BASE`, and
   `GITLAB_SECRETS_OTP_KEY_BASE` in your `docker-compose.yml` with the
   contents of your clipboard:
    ``` bash
    node -e "process.stdout.write(require('crypto').randomBytes(32).toString('hex'))" | pbcopy
    ```
    
    After that, copy the file to your remote machine with scp:

    ``` bash
    scp docker-compose.yml root@1337.1337.1337.1337:gitlab/
    ```
7. Go back to your remote machine and run the following command:
    ``` bash
    docker-compose up
    ```
8. Add a DNS entry pointing from your domain to your instance
9. Install nginx:
    ```
    apt install -y nginx
    ```
10. install LetsEncrypt and get a certificate
    ```
    add-apt-repository -y ppa:certbot/certbot
    apt update
    apt install -y python-certbot-nginx
    # Add your domain to server_name (search for it by typing `/server_name<CR>`).
    # Example: server_name gitlab.yourdomain.com;
    vi /etc/nginx/sites-enabled/default
    systemctl reload nginx
    ufw allow https
    ufw allow http
    ```

    On your local machine you should now be able to access your servery by HTTP:

    ``` bash
    $ curl -I http://gitlab.yourdomain.com/
    HTTP/1.1 200 OK
    (headers and a blank line...)
    ```

    This means you're ready to get a cert. Back on the remote server. Run this
    and be sure to choose the HTTP to HTTPS redirect option:

    ``` bash
    certbot --nginx -d gitlab.yourdomain.com
    ```

    Now, back on your local computer, when you run this, you should get 200 OK:

    ``` bash
    curl -I https://gitlab4.benatkin.com/
    ```
11. Proxy nginx to letsencrypt


[url]: https://github.com/resources/snippets/tree/master/setup-gitlab
[docker-instructions]: https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#supported-storage-drivers
[docker-gitlab]: https://github.com/sameersbn/docker-gitlab
[docker-compose-install]: https://docs.docker.com/compose/install/#install-compose
[docker-gitlab-quickstart]: https://github.com/sameersbn/docker-gitlab#quick-start
[docker-compose-yml]: https://raw.githubusercontent.com/sameersbn/docker-gitlab/master/docker-compose.yml
