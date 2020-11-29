FROM ubuntu:latest
LABEL manteiner="celsoalexandre <celsoalexandre@NOSPAM.NO>"

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nano iputils-ping
RUN apt-get install -y inadyn

ADD dyndns.init.sh /init.sh
RUN chmod 755 /init.sh
CMD /init.sh setup
