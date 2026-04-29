# python alignment.py --input_hr '/home/bxg-Fair/zareen/ZeDuSR/RealworldData/Data/TeleView_SIFTAlign_cor/Fire.jpeg' --input_lr '/home/bxg-Fair/zareen/ZeDuSR/RealworldData/Data/WideView_crop/Fire.jpeg' --output_path '/home/bxg-Fair/zareen/ZeDuSR/RealworldData/Data/DIAlign/' --dataset 'iPhone11_wideSRTele/Fire_colorCorrect' --shave 5 --scale 2 --epochs 1001 --fre_epoch 700 
#python alignment.py --input_hr 'D:\ZeDuSR\zedusr\RealworldData\Data\TeleView_SIFTAlign_cor\Car.jpeg' --input_lr 'D:\ZeDuSR\zedusr\RealworldData\Data\WideView_crop\Car.jpeg' --output_path 'D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign' --dataset 'iPhone11_wideSRTele\Car' --shave 5 --scale 2 --epochs 21 --fre_epoch 10    #700 


# Run alignment.py script (PowerShell version)

python "alignment.py" `
    --input_hr "D:\ZeDuSR\zedusr\RealworldData\Data\TeleView_SIFTAlign_cor\Car.jpeg" `
    --input_lr "D:\ZeDuSR\zedusr\RealworldData\Data\WideView_crop\Car.jpeg" `
    --output_path "D:\ZeDuSR\zedusr\RealworldData\Data\DIAlign" `
    --dataset "iPhone11_wideSRTele\Car" `
    --shave 5 `
    --scale 2 `
    --epochs 31 `       
    --fre_epoch 10

# epochs 21 for final results, 11 for quick test
# fre_epoch 10 for final results, 5 for quick test
