import tempfile

# get temporary file path from file storage object
def get_temp_file_path(file):
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        # if hasattr(file, 'chunks'):
        #     for chunk in file.chunks():
        #         temp_file.write(chunk)
        # else:
        temp_file.write(file.read())
        temp_file_path = temp_file.name

    return temp_file_path