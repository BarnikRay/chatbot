from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

import logging

from rasa_core.agent import Agent
from rasa_core.policies.keras_policy import KerasPolicy
from rasa_core.policies.memoization import MemoizationPolicy


def run_faq(domain_file="config/faq_domain.yml",
            training_data_file='data/stories.md'):
    agent = Agent(domain_file,
                  policies=[MemoizationPolicy(max_history=2), KerasPolicy(max_history=3, epochs=100, batch_size=50)])

    data = agent.load_data(training_data_file)
    model_path = './models/dialogue'
    agent.train(data)
    agent.persist(model_path)


if __name__ == '__main__':
    logging.basicConfig(level="INFO")
    run_faq()
