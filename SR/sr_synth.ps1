# python ./ZSSR.py \
#         --scale 2 \
#         --shave 4 \
#         --train_lr '../SynthesizedData/Data/DIAlign/artroom_isoJPEG2x/artroom/out_1000_warp.png' \
#         --train_hr '../SynthesizedData/Data/DIAlign/artroom_isoJPEG2x/artroom/HR.png' \
#         --test_lr '../SynthesizedData/Data/WideView_iso2x_JPEG75/artroom.jpg' \
#         --test_hr '../SynthesizedData/Data/WideView_GT/artroom.jpg' \
#         --Invari_map '../SynthesizedData/Data/DIAlign/artroom_isoJPEG2x/artroom/PatchDisOut.npy' \
#         --output_path './Results_Synthesized/' \
#         --dataset 'artroom_isoJPEG2x/artroom'

python ./ZSSR.py `
    --scale 2 `
    --shave 4 `
    --train_lr 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/SynthesizedData/Data/DIAlign/artroom_isoJPEG2x/artroom/out_1000_warp.png' `
    --train_hr 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/SynthesizedData/Data/DIAlign/artroom_isoJPEG2x/artroom/HR.png' `
    --test_lr 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/SynthesizedData/Data/WideView_iso2x_JPEG75/artroom.jpg' `
    --test_hr 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/SynthesizedData/Data/WideView_GT/artroom.jpg' `
    --Invari_map 'C:/BSG team_z/PYTHON/zareen/ZeDuSR/SynthesizedData/Data/DIAlign/artroom_isoJPEG2x/artroom/PatchDisOut.npy' `
    --output_path './Results_Synthesized/' `
    --dataset 'artroom_isoJPEG2x/artroom'

