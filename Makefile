FIG=UID=$(shell id -u) GID=$(shell id -g) docker compose
RUN=$(FIG) run --rm app
EXEC=$(FIG) exec app

.DEFAULT_GOAL := help
.PHONY: help build start stop debug debug-root test

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

##
## Project setup
##---------------------------------------------------------------------------

build:          ## Build the Docker image
build:
	sudo mkdir -p docker/pgdata
	sudo chown $(shell id -u):$(shell id -g) docker/pgdata -Rf
	$(FIG) build

start:          ## Install the full project
start: build up

stop:           ## Stop containers
stop:
	$(FIG) kill
	$(FIG) rm -v --force

up:             ## Run images
up:
	$(FIG) up -d

##
## Tests
##---------------------------------------------------------------------------

debug:          ## Debug container
debug:
	$(EXEC) bash

test:           ## Run tests
test:
	$(EXEC) docker-entrypoint.sh tests

##