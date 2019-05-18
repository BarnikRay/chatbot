from rasa_nlu.training_data import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer, Metadata, Interpreter
from rasa_nlu import config


def train(data, config_file, model_dir):
    training_data = load_data(data)
    configuration = config.load(config_file)
    trainer = Trainer(configuration)
    trainer.train(training_data)
    model_directory = trainer.persist(model_dir, fixed_model_name='chat')


def run():
    interpreter = Interpreter.load('./models/nlu/default/chat')
    # print(interpreter.parse('I want to order pizza'))
    print(interpreter.parse('u"who is the leader of iran?"'))


if __name__ == '__main__':
    # train('./data/trainer.json', './config/config.yml', './models/nlu')
    run()
