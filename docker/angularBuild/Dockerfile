FROM ubuntu:18.04
RUN apt update -y
RUN apt install -y curl gnupg unoconv
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y nodejs
RUN npm install -g @angular/cli
RUN apt install -y nginx
COPY ./start.sh /start.sh
EXPOSE 80
CMD ["./start.sh"]