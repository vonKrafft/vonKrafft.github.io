#!/usr/bin/env python
# -*- coding: utf-8 -*-

from PIL import Image
import hashlib
import math
import sys
import os

if len(sys.argv) < 2:
    sys.stderr.write('Usage: python {} IMAGE\n'.format(__file__))
    sys.exit(1)

abspath = os.path.dirname(os.path.abspath(sys.argv[1]))
filepath = os.path.join(abspath, sys.argv[1])

print('Original file:  {}'.format(os.path.basename(filepath)))

filename, file_extension = os.path.splitext(os.path.basename(filepath))
new_filename = hashlib.md5(filename).hexdigest()

try:
    im = Image.open(filepath)
    im.save('{}{}'.format(new_filename, file_extension), im.format)
    print('New file:       {}{}'.format(new_filename, file_extension))
except IOError:
    sys.stderr.write('Error: cannot rename file for {}\n'.format(filepath))
    sys.exit(1)

try:
    im = Image.open(filepath)
    width, height = im.size
    if width > 1024:
        new_width, new_height = (1024, int(1024 * height / width))
        im = im.resize((new_width, new_height), Image.ANTIALIAS)
        im.save('{}-{}x{}{}'.format(new_filename, new_width, new_height, file_extension), im.format)
        print('1024px ratio:   {}-{}x{}{}'.format(new_filename, new_width, new_height, file_extension))
except IOError:
    sys.stderr.write('Error: cannot create 1024px ratio for {}\n'.format(filepath))
    sys.exit(1)

try:
    im = Image.open(filepath)
    width, height = im.size
    if width > 300:
        new_width, new_height = (300, int(300 * height / width))
        im = im.resize((new_width, new_height), Image.ANTIALIAS)
        im.save('{}-{}x{}{}'.format(new_filename, new_width, new_height, file_extension), im.format)
        print('300px ratio:    {}-{}x{}{}'.format(new_filename, new_width, new_height, file_extension))
except IOError:
    sys.stderr.write('Error: cannot create 300px ratio for {}\n'.format(filepath))
    sys.exit(1)

try:
    im = Image.open(filepath)
    width, height = im.size
    if width < height:
        cropped = height - width
        im = im.crop((0, int(math.floor(cropped / 2)), width, int(height - math.ceil(cropped / 2))))
    elif width > height:
        cropped = width - height
        im = im.crop((int(math.floor(cropped / 2)), 0, int(width - math.ceil(cropped / 2)), height))
    im.thumbnail((150, 150), Image.ANTIALIAS)
    im.save('{}-150x150{}'.format(new_filename, file_extension), im.format)
    print('Thumbnail:      {}-150x150{}'.format(new_filename, file_extension))
except IOError:
    sys.stderr.write('Error: cannot create thumbnail for {}\n'.format(filepath))
    sys.exit(1)