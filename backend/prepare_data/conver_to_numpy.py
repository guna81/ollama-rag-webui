from PIL import Image
import numpy as np

def convert_to_numpy(image):
    img = Image.open(image)
    img_array = np.array(img)
    return img_array