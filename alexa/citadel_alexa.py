# coding=utf-8

# citadel-alexa
# By Jon Robison <narfman0@gmail.com>
#
# The alexa facing logic surrounding citadel

import logging
from datetime import datetime
from flask import Flask, json, render_template
from flask_ask import Ask, request, session, question, statement

__author__ = 'Jon Robison'
__email__ = 'narfman0@gmail.com'


app = Flask(__name__)
ask = Ask(app, '/')
logging.getLogger("flask_ask").setLevel(logging.DEBUG)

# Session starter
#
# This intent is fired automatically at the point of launch (= when the session starts).
# Use it to register a state machine for things you want to keep track of, such as what the last intent was, so as to be
# able to give contextual help.

@ask.on_session_started
def start_session():
    """
    Fired at the start of the session, this is a great place to initialise state variables and the like.
    """
    logging.debug("Session started at {}".format(datetime.now().isoformat()))

# Launch intent
#
# This intent is fired automatically at the point of launch.
# Use it as a way to introduce your Skill and say hello to the user. If you envisage your Skill to work using the
# one-shot paradigm (i.e. the invocation statement contains all the parameters that are required for returning the
# result

@ask.launch
def handle_launch():
    """
    (QUESTION) Responds to the launch of the Skill with a welcome statement and a card.
    """
    logging.debug("Launched at {}".format(datetime.now().isoformat()))
    return statement("Welcome to citadel! Please use get or set office intents.")


@ask.intent('GetOfficeIntent', mapping={'person': 'PERSON'})
def get_office(person):
    """
    (QUESTION) Handles query responses

    e.g.:
    jim> alexa, ask citadel where jon is today?
    alexa> jon is working from home today
    """
    location = 'unknown'
    # TODO use dynamodb to get user location
    text = person + ' location for today is: ' + location
    return statement(text)


@ask.intent('SetOfficeIntent', mapping={'office': 'LOCATION'})
def set_office(office):
    """
    (QUESTION) Handles query responses

    e.g.:
    jim> alexa, ask citadel where jon is today?
    alexa> jon is working from home today
    """
    # TODO use dynamodb to set user location
    text = 'Your location is updated to ' + office
    return statement(text)



# Built-in intents
#
# These intents are built-in intents. Conveniently, built-in intents do not need you to define utterances, so you can
# use them straight out of the box. Depending on whether you wish to implement these in your application, you may keep
# or delete them/comment them out.
#
# More about built-in intents: http://d.pr/KKyx

@ask.intent('AMAZON.StopIntent')
def handle_stop():
    """
    (STATEMENT) Handles the 'stop' built-in intention.
    """
    farewell_text = render_template('stop_bye')
    return statement(farewell_text)


@ask.intent('AMAZON.CancelIntent')
def handle_cancel():
    """
    (STATEMENT) Handles the 'cancel' built-in intention.
    """
    farewell_text = render_template('cancel_bye')
    return statement(farewell_text)


@ask.intent('AMAZON.HelpIntent')
def handle_help():
    """
    (QUESTION) Handles the 'help' built-in intention.

    You can provide context-specific help here by rendering templates conditional on the help referrer.
    """

    help_text = render_template('help_text')
    return question(help_text)


@ask.session_ended
def session_ended():
    """
    Returns an empty for `session_ended`.

    .. warning::

    The status of this is somewhat controversial. The `official documentation`_ states that you cannot return a response
    to ``SessionEndedRequest``. However, if it only returns a ``200/OK``, the quit utterance (which is a default test
    utterance!) will return an error and the skill will not validate.

    """
    return statement("")


if __name__ == '__main__':
    app.run(debug=True)
