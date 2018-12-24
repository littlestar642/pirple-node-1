## Project Overview

A basic NodeJs https and a http server with a locally generated ssl certificate and a key. The project is one of the assignments of the pirple nodejs masterclass course.

I have used **NO NPM LIBS** for the creation of the http and the https servers.

## Contributing

If you fork the project please be sure to regenerate the key and the certificate for your system. You can do that by executing this command inside the https folder on linux `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`