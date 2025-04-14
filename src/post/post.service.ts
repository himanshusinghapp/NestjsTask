import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(createPostDto: CreatePostDto, userId: string) {
    const newPost = new this.postModel({
      ...createPostDto,
      user: userId,
    });
    return newPost.save();
  }

  async getPostsByUser(userId: string) {
    return this.postModel.find({ user: userId }).exec();
  }
}
