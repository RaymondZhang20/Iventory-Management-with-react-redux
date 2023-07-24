const {getAlbum, getAllAlbums, getSorted, getFiltered, patchAlbum, postAlbum, deleteAlbum} = require('../routes/albums');
const Album = require('../models/album');
const express = require("express");
var router = express.Router();
const mockAlbums = [{ _id: '1', title: 'Test Album 1' }, { _id: '2', title: 'Test Album 2' }];

describe('Album Test', function () {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Album, 'findById').mockImplementation(async (id) => {
            if (id === '1') {
                return mockAlbums[0];
            } else if (id === '2') {
                return mockAlbums[1];
            } else {
                return  null;
            }
        });
        jest.spyOn(Album, 'find').mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockAlbums),
        });
    })

    describe('getAlbum', () => {
        test('should return the album when it exists', async () => {
            const req = { params: { id: '1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await getAlbum(req, res, next);

            expect(Album.findById).toHaveBeenCalledWith('1');
            expect(res.album).toEqual(mockAlbums[0]);
            expect(next).toHaveBeenCalled();
        });

        test('should return 404 when album is not found', async () => {
            const req = { params: { id: 'nullId' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await getAlbum(req, res, next);

            expect(Album.findById).toHaveBeenCalledWith('nullId');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find the album' });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('getAllAlbums', () => {
        test('should return all albums', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await getAllAlbums(req, res, next);

            expect(Album.find).toHaveBeenCalledWith();
            expect(res.json).toHaveBeenCalledWith(mockAlbums);
            expect(next).not.toHaveBeenCalled();
        })
    })
});

module.exports = router;