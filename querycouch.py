
import sys
import getopt
import os
import csv
import cPickle
import gzip
import theano
import time, PIL.Image
import couchdb

from csv_unicode_helpers import UnicodeWriter
from struct import *
from numpy import *
from couchdb.mapping import Document, LongField, DateField, FloatField, TextField, IntegerField, BooleanField
from couchdb import Server

class QueryCouch(object):
        
        def __init__(self, server_url, database):
                couch = Server(server_url)
                self.db = couch[database]

        def tokens_overall(self):
            view = self.db.view('research/tokens', reduce=True, group_level=2)
                
            results = []
            for row in view:
                results.append((row.value,row.key[0], row.key[1]))
                
            results.sort()
            results.reverse()
            return results
        
        def tokens_overall_by_type(self,type):
            view = self.db.view('research/tokens', reduce=True, group_level=2, startkey=[type], endkey=[type + ' '])
            
            print 'getting tokens of type ', type
            results = []
            for row in view:
                results.append((row.value, row.key[1]))
                
            results.sort()
            results.reverse()
            return results
        
        def top_tokens_by_date_type(self, type):
                
                top_tokens = self.tokens_overall_by_type(type)
                
                results = []
                for (overall_count, token) in top_tokens[0:1000]:
                        
                        view = self.db.view('research/tokens', reduce=True, group_level=4, startkey=[type, token], endkey=[type, token +' '])                        
                        for row in view:
                            results.append((row.key[0], row.key[1], row.key[2], row.value, overall_count))
                            
                return results
