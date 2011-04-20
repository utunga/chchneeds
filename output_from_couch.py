
import sys
import getopt
import os
import csv
import cPickle
import gzip
#import theano
import time, PIL.Image
import couchdb
import numpy

from querycouch import QueryCouch
from csv_unicode_helpers import UnicodeWriter

def clean_filename(filename):
    """util function"""
    return re.sub("[^a-zA-Z]", "", filename)

def output_tokens_overall_to_csv(query):
    
    csv_writer = csv.writer(open('out/tokens_overall.csv', 'wb'))
    print 'querying couch'
    rows = query.tokens_overall()
    print 'rows retrieved'
    for row in rows:
        csv_writer.writerow(row)

def output_tokens_by_date_to_csv(query):
    
    csv_writer = csv.writer(open('out/top_tags_by_date.csv', 'wb'))
    print 'querying couch for top tags'
    rows = query.top_tokens_by_date_type('tag')
    for row in rows:
        csv_writer.writerow(row)
    print 'wrote top tags'
    
    print 'querying couch for top mentions'
    csv_writer = csv.writer(open('out/top_mentions_by_date.csv', 'wb'))
    rows = query.top_tokens_by_date_type('mention')
    for row in rows:
        csv_writer.writerow(row)
    print 'wrote top mentions'
    
    print 'querying couch for word'
    csv_writer = csv.writer(open('out/top_words_by_date.csv', 'wb'))
    rows = query.top_tokens_by_date_type('word')
    for row in rows:
        csv_writer.writerow(row)
    print 'wrote top words'
    
def main(argv = sys.argv):
    server_url = 'http://chchneeds.org.nz'
    database = 'alldb'
    query = QueryCouch(server_url, database)
    output_tokens_by_date_to_csv(query)

if __name__ == '__main__':
    sys.exit(main())    