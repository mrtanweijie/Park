import { OBJ_STATUS } from '../../Constants'
class BaseService {
  constructor (ObjModel) {
    this.ObjModel = ObjModel
  }

  saveObject (objData) {
    return new Promise((resolve, reject) => {
      this.ObjModel(objData).save((err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }

  batchSave (docs) {
    return new Promise((resolve, reject) => {
      this.ObjModel.collection.insert(docs, {}, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }

  deleteObject (objId) {
    return this.updateObject(objId, {status: OBJ_STATUS.DELETE})
  }

  updateObject (objId, params) {
    params.modifyTime = new Date()
    return new Promise((resolve, reject) => {
      this.ObjModel.update(
        { _id: objId },
        {
          $set: params
        },
        err => {
          if (err) {
            return reject(err)
          }
          return resolve()
        }
      )
    })
  }

  findObj (params) {
    return new Promise((resolve, reject) => {
      this.ObjModel.findOne(params, { __v: 0 }, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }
}

export default BaseService
