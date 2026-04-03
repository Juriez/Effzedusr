import torch
import torch.nn as nn
import torch.nn.functional as F
import math
import torch.nn as nn
import torch.utils.model_zoo as model_zoo
from models.model_lib.zssr import ZSSRNet
from models.model_lib.vdsr import VDSR
from models.model_lib.rcan import RCAN
from math import sqrt
import os
pretrained_path='D:\\ZeDuSR\\zedusr\\SR\\models\\preTrained\\RCAN_BIX4.pt'
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')


class MODEL(nn.Module):
    def __init__(self, args, pretrained_path=pretrained_path, device = device):
        super(MODEL, self).__init__()
        # self.stn  =STN()
        # self.vdsr = VDSR()
        self.srmodel = RCAN(args)
        # Load pretrained weights if path is given
        if pretrained_path is not None:
            print(f" Loading pretrained RCAN model from {pretrained_path}")
            checkpoint = torch.load(pretrained_path, map_location=device)
            
            # Some checkpoints have "state_dict" key
            if "state_dict" in checkpoint:
                checkpoint = checkpoint["state_dict"]
            
            # Remove "module." if trained with DataParallel
            new_state_dict = {}
            for k, v in checkpoint.items():
                if k.startswith("module."):
                    new_state_dict[k[len("module."):]] = v
                else:
                    new_state_dict[k] = v
            
            missing, unexpected = self.srmodel.load_state_dict(new_state_dict, strict=False)
            if missing:
                print(f"[WARNING] Missing keys: {missing}")
            if unexpected:
                print(f"[WARNING] Unexpected keys: {unexpected}")
            print("[INFO] Pretrained weights loaded successfully.")
        else:
            print("[INFO] No pretrained model loaded.")

        
    def forward(self, x):

        out = self.srmodel(x)
        return out


if __name__ =='__main__':
    input = torch.rand(6, 3, 500, 500)
    input = input.cuda()
    # input = torch.rand(6, 3, 4032, 3024)
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--n_resgroups', type=int, default=10)
    parser.add_argument('--n_resblocks', type=int, default=20)
    parser.add_argument('--n_feats', type=int, default=64)
    parser.add_argument('--n_reduction', type=int, default=16)
    parser.add_argument('--scale', type=int, default=4)
    args = parser.parse_args()

    model = MODEL(args, pretrained_path=pretrained_path, device=device).to(device)
    # for m in model.modules():
    #     print(m)
    vdsr_params = model.vdsr.parameters()
    # vdsr_params = filter(lambda p: id(p)  in vdsr_params, model.parameters())

    print(vdsr_params)
    # print(conv_params)
    # model = model.cuda()
    # output = model(input,input)
    print(input.size())
    # print(output.size())



